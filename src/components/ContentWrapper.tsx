//src/components/ContentWrapper.tsx
import { Image } from 'astro:assets';

export const ContentWrapper = {
  img: (props: any) => {
    const isStaticImage = props?.src && typeof props.src === 'object' && 'src' in props.src;

    const normalizeAlt = (alt: string | undefined, src: any) => {
      if (!alt) return '';
      const altText = alt.trim().toLowerCase();
      const srcString = typeof src === 'string' ? src : src?.src || '';

      const cleaned = altText
        .replace(/\b(image|photo|picture|screenshot|gambar|foto)\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (srcString.toLowerCase().includes(cleaned)) return '';

      return cleaned;
    };

    const cleanAlt = normalizeAlt(props.alt, props.src);
    const hasCaption = !!cleanAlt;

    const commonStyles = {
      borderRadius: '8px',
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
      margin: '0 auto',
      alt: '',
    };

    return (
      <figure style={{ margin: '2rem auto', textAlign: 'center' }}>
        {isStaticImage ? (
          <Image
            src={props.src}
            alt={cleanAlt}
            sizes="(max-width: 768px) 100vw, 768px"
            loading="eager"
            style={commonStyles}
          />
        ) : (
          <img
            src={props.src}
            alt={cleanAlt}
            loading="eager"
            style={commonStyles}
          />
        )}
        {hasCaption && (
          <figcaption style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
            {cleanAlt}
          </figcaption>
        )}
      </figure>
    );
  },
  table: (props: any) => {
    return (
      <div className="prose">
        <table {...props} /> 
      </div>
    );
  },
};
