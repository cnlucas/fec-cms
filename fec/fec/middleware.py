from django.utils.deprecation import MiddlewareMixin
from django.conf import settings


class AddSecureHeaders(MiddlewareMixin):
    """Add secure headers to each response"""

    def process_response(self, request, response):

        content_security_policy = {
            # 'data:' is like 'http:'
            "default-src": [
                "'self'",
                "*.fec.gov",
                "*.app.cloud.gov",
            ],
            "connect-src": [
                "'self'",
                "*.fec.gov",
                "*.app.cloud.gov",
                "https://www.google-analytics.com",
            ],
            "font-src": ["'self'"],
            "frame-src": [
                "'self'",
                "https://www.google.com/recaptcha/",
                "https://www.youtube.com/",
            ],
            "img-src": [
                "'self'",
                "*.fec.gov",
                "*.app.cloud.gov",
                "data:",
                "https://*.ssl.fastly.net",
                "https://www.google-analytics.com",
            ],
            "script-src": [
                "'self'",
                "'unsafe-inline'",
                "'unsafe-eval'",
                "https://dap.digitalgov.gov",
                "https://polyfill.io/",
                "https://www.google.com/recaptcha/",
                "https://ssl.google-analytics.com",
                "https://www.google-analytics.com",
                "https://www.googletagmanager.com",
                "https://www.gstatic.com/recaptcha/",
            ],  # do we need unsafe-eval? (Doesn't it only allow 'eval()'?)
            "style-src": [
                "'self'",
                "'unsafe-inline'",
                "data:",
            ],
            "object-src": ["'none'"],
            # Google's requirements found at https://developers.google.com/tag-manager/web/csp
            #
            # TODO: To get away from unsafe-inline, we could look into hashing our inline script elements:
            # TODO: like this https://content-security-policy.com/hash/
        }
        if settings.FEC_CMS_ENVIRONMENT == 'LOCAL':
            content_security_policy["default-src"].append("localhost:* http://127.0.0.1:*")  # TODO: add filesystem?

        if settings.FEC_CMS_ENVIRONMENT != 'PRODUCTION':  # pre-prod environments
            content_security_policy["font-src"].append("https://fonts.gstatic.com/ data:")
            content_security_policy["img-src"].append("https://ssl.gstatic.com/ https://www.gstatic.com/")
            content_security_policy["script-src"].append("https://tagmanager.google.com/")
            # Could use extend() if we want to add two elements instead of a string
            content_security_policy["style-src"].append("https://tagmanager.google.com/ https://fonts.googleapis.com/")

        # Add specific rules/permissions for users who are logged in (and not for the general site visitor)
        if request.user.is_authenticated:
            content_security_policy["img-src"].append("http://www.gravatar.com/avatar/dd9a1a05d5c70a0ce8317f4172745459")
            content_security_policy["connect-src"].append("https://releases.wagtail.io/latest.txt")

        # Skip CSP reporting in production so we don't clutter up the logs
        if settings.FEC_CMS_ENVIRONMENT != 'PRODUCTION':
            # Report violations to the API
            report_uri = "{0}/report-csp-violation/?api_key={1}".format(
                settings.FEC_API_URL, settings.FEC_API_KEY_PUBLIC
            )
            # Add as one-element list to match other rules
            content_security_policy["report-uri"] = [report_uri]

        response["Content-Security-Policy"] = "".join(
            "{0} {1}; ".format(directive, " ".join(value))
            for directive, value in content_security_policy.items()
        )
        response["cache-control"] = "max-age=2678400"
        return response
