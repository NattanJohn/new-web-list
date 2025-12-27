"use client";

import { Twitter, Linkedin, MessageCircle, Share2 } from "lucide-react";
import styles from "./ShareButtons.module.scss";

interface ShareButtonsProps {
  title: string;
  url: string;
  summary?: string;
}

export const ShareButtons = ({
  title,
  url,
  summary = "",
}: ShareButtonsProps) => {
  // Usa a URL do navegador apenas se for diferente da prop (SSR vs client)
  const shareUrl =
    typeof window !== "undefined" && window.location.href !== url
      ? window.location.href
      : url;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}${
      encodedSummary ? `%20-%20${encodedSummary}` : ""
    }&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}${
      encodedSummary ? `%0A${encodedSummary}%0A` : "%20"
    }${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  // Detecta mobile
  const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  const openShare = (link: string) => {
    if (isMobile && navigator.share) {
      // Usa a Web Share API se disponível
      navigator.share({
        title,
        text: summary,
        url: shareUrl,
      });
    } else {
      window.open(link, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Share2 size={16} className={styles.shareIcon} />
        <span className={styles.label}>Compartilhar artigo</span>
      </div>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.twitter}`}
          onClick={() => openShare(shareLinks.twitter)}
          aria-label="Twitter"
        >
          <Twitter size={20} fill="currentColor" />
        </button>

        <button
          className={`${styles.button} ${styles.whatsapp}`}
          onClick={() => openShare(shareLinks.whatsapp)}
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} fill="currentColor" />
        </button>

        <button
          className={`${styles.button} ${styles.linkedin}`}
          onClick={() => openShare(shareLinks.linkedin)}
          aria-label="LinkedIn"
        >
          <Linkedin size={20} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};
