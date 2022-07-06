import * as React from "react"

const Container = ({ children }) => {
  return (
    <div className="p-4 lg:p-7 mx-auto max-w-6xl w-full">
      {children}
    </div>
  )
}

export default Container