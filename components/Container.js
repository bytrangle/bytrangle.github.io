const Container = ({ children, fullWidth }) => {
  return (
    <main
      className={`m-auto flex-grow w-full transition-all ${
        fullWidth ? 'px-4 md:px-24' : 'max-w-2xl px-4'
      }`}
    >
      {children}
    </main>
  )
}

export default Container