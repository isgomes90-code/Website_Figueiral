import Script from "next/script";

function jsonLdScriptId(data: Record<string, unknown>) {
  let hash = 0;
  const payload = JSON.stringify(data);
  for (let i = 0; i < payload.length; i += 1) {
    hash = (hash * 31 + payload.charCodeAt(i)) >>> 0;
  }
  return `jsonld-${hash.toString(36)}`;
}

export function JsonLd({
  data,
  inline = false
}: {
  data: Record<string, unknown>;
  /** Inclui o JSON-LD no HTML inicial (sem next/script lazyOnload). */
  inline?: boolean;
}) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  if (inline) {
    return (
      <script
        id={jsonLdScriptId(data)}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
    );
  }

  return (
    <Script
      id={jsonLdScriptId(data)}
      type="application/ld+json"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
