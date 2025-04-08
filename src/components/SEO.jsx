import { useEffect } from "react";
import { seoData } from "../seoData";

export function SEO({ calculator = "" }) {
  useEffect(() => {
    const data = calculator
      ? seoData[calculator]
      : {
          title:
            "CalcularBrasil - Calculadoras Online Gratuitas | Sua Ferramenta de Cálculo",
          description:
            "Ferramentas de cálculo online gratuitas para suas necessidades diárias. Calcule porcentagem, IMC, combustível, juros compostos e muito mais. Resultados instantâneos e precisos.",
          keywords:
            "calculadora online, calculadora grátis, calculadora de porcentagem, calculadora de IMC, calculadora de combustível, calculadora financeira",
          metaDescription:
            "Calculadoras online gratuitas para todas as suas necessidades. Ferramentas práticas e fáceis de usar para cálculos diários.",
        };

    // Atualiza o título da página
    document.title = data.title;

    // Atualiza ou cria meta tags
    updateMetaTag("description", data.metaDescription);
    updateMetaTag("keywords", data.keywords);

    // Open Graph
    updateMetaTag("og:title", data.title);
    updateMetaTag("og:description", data.metaDescription);
    updateMetaTag("og:type", "website");
    updateMetaTag("og:url", window.location.href);

    // Twitter Card
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", data.title);
    updateMetaTag("twitter:description", data.metaDescription);
  }, [calculator]);

  return null;
}

function updateMetaTag(name, content) {
  let meta = document.querySelector(
    `meta[name="${name}"], meta[property="${name}"]`
  );

  if (!meta) {
    meta = document.createElement("meta");
    if (name.startsWith("og:") || name.startsWith("twitter:")) {
      meta.setAttribute("property", name);
    } else {
      meta.setAttribute("name", name);
    }
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}
