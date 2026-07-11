import React from 'react';

/**
 * AI mesajlarını (ve ders notlarını) sade metin yerine biçimlendirilmiş
 * olarak gösterir: **kalın**, __altı çizili__, "- " ile başlayan satırlar
 * madde işaretine dönüşür, boş satırlar paragraf arası boşluk bırakır.
 */
export default function FormattedMessage({ text, className = '' }: { text: string; className?: string }) {
  const blocks = text.split(/\n{2,}/).map(b => b.trim()).filter(Boolean);

  return (
    <div className={`space-y-2.5 ${className}`}>
      {blocks.map((block, bi) => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        const isBulletBlock = lines.length > 0 && lines.every(l => /^[-•]\s+/.test(l));

        if (isBulletBlock) {
          return (
            <ul key={bi} className="space-y-1.5 pl-1">
              {lines.map((l, li) => (
                <li key={li} className="flex gap-2">
                  <span className="shrink-0 mt-0.5 text-blue-500">•</span>
                  <span>{renderInline(l.replace(/^[-•]\s+/, ''))}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={bi} className="leading-relaxed">
            {lines.map((l, li) => (
              <React.Fragment key={li}>
                {li > 0 && <br />}
                {renderInline(l)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/** **kalın**, __altı çizili__ ve `kod` gibi satır içi biçimlendirmeleri işler. */
function renderInline(line: string): React.ReactNode[] {
  const tokens = line.split(/(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`)/g).filter(t => t !== '');
  return tokens.map((tok, i) => {
    if (tok.startsWith('**') && tok.endsWith('**')) {
      return <strong key={i} className="font-bold text-gray-900">{tok.slice(2, -2)}</strong>;
    }
    if (tok.startsWith('__') && tok.endsWith('__')) {
      return <span key={i} className="underline decoration-2 decoration-blue-400 underline-offset-2">{tok.slice(2, -2)}</span>;
    }
    if (tok.startsWith('`') && tok.endsWith('`')) {
      return <code key={i} className="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded text-[0.9em] font-mono">{tok.slice(1, -1)}</code>;
    }
    return <React.Fragment key={i}>{tok}</React.Fragment>;
  });
}
