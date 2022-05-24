const Text = ({ text }) => {
  if (!text) {
    return null
  }
  return text.map((value, index) => {
    const { text, annotations: { bold, italic, color, code, strikethrough, underline } } = value
    return (
      <span
        className={[
          bold ? 'bold' : '',
          italic ? 'italic' : '',
          strikethrough ? 'strikethrough' : '',
          underline ? 'underline' : '',
          code ? "code" : ""
        ].join(" ")}
        style={color !== 'default' ? { color } : {}}
        key={index}>
        {text.link ? <a></a> : text.content}
      </span>
    )
  })
}

export default Text