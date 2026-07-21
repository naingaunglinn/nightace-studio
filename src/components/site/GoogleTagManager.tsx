const GTM_ID = "GTM-P9NCL6BZ";

// The container ID is the only value ever interpolated into the raw snippets
// below. It must match Google's ID format — never widen this to accept
// request, user, or env-derived input without keeping this validation.
const isValidGtmId = /^GTM-[A-Z0-9]+$/.test(GTM_ID);

/**
 * Google's official GTM bootstrap. Renders in <head>. The snippet is static,
 * trusted content, which is the one case dangerouslySetInnerHTML is meant for
 * (React would otherwise escape the inline script).
 */
export function GoogleTagManagerScript() {
  if (!isValidGtmId) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
    />
  );
}

/**
 * GTM fallback for browsers with JavaScript disabled. Renders immediately
 * after the opening <body> tag.
 */
export function GoogleTagManagerNoScript() {
  if (!isValidGtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
