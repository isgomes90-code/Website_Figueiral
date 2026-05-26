import Script from "next/script";

function jsonLdScriptId(data: Record<string, unknown>) {
  let hash = 0;
  const payload = JSON.stringify(data);
  for (let i = 0; i < payload.length; i += 1) {
    hash = (hash * 31 + payload.charCodeAt(i)) >>> 0;
  }
  return `jsonld-${hash.toString(36)}`;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <Script
      id={jsonLdScriptId(data)}
      type="application/ld+json"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c")
      }}
    />
  );
}
