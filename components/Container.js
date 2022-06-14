const Container = ({ children, fullWidth }) => {
  return (
    <div className="wrapper pt-8 lg:pt-10">
      <main
        className={`m-auto flex-grow w-full transition-all ${
          fullWidth ? 'px-4 md:px-24' : 'max-w-2xl px-4'
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default Container