import { useEffect, useState ,Fragment} from "react";
import { useParams, Link } from "react-router-dom";  // Importing necessary modules from react-router-dom
import axios from "axios";// Importing axios for making HTTP requests
import success from "../../images/success.png";
import styles from "./styles.module.css";

const EmailVerify = () => {
	// State variable to represent whether the URL parameters are valid or not
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();    // Extracting parameters from the URL

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				// Constructing the URL for email verification
				const url = `http://localhost:3000/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);// Dependency array with param as a dependency

	return (
		<Fragment>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;
