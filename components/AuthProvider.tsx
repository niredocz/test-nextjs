const Loading = () => {
  return (
    <div className="loader"></div>
  )
}

const AuthProvider = () => {
  return (
    <>
      <Loading />
      <div>AuthProvider</div>
    </>
  )
}

export default AuthProvider