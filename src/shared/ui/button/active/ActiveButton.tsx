


export default function ActiveButton({ text, style, onClick }: { text: string, style?: React.CSSProperties, onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        borderRadius: '100px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '24px',
        cursor: 'pointer',
        textDecoration: 'none',
      }}>{text}</button>
  )
}
