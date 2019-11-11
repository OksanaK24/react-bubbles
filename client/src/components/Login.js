import React, {useState} from "react";
import api from "../utils/api";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [error, setError] = useState()
	const [user, setUser] = useState({
		username: "",
		password: "",
  })

  const handleChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		})
	}
  
  const handleSubmit = (event) => {
		event.preventDefault()

		api()
			.post("/api/login", user)
			.then(result => {
				localStorage.setItem("token", result.data.payload)
				props.history.push("/bubble_page")
			})
			.catch(err => {
				setError(err.response.data.message)
			})
	}

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>

      <form onSubmit={handleSubmit}>
			{error && <div>{error}</div>}

			<input type="username" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
			<input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />

			<button type="submit">Login</button>
		</form>
    </>
  );
};

export default Login;