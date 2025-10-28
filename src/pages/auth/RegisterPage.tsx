import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from 'reactfire';

const RegisterPage = () => {

    const auth = useAuth()

    const handleClickGoogle = async () => {
        console.log('clic');
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('error ', error);
        }
    }
  return (
    <div>
      <button onClick={handleClickGoogle}>Gogole</button>
    </div>
  )
}

export default RegisterPage
