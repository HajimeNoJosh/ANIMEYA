import {Title, Subtitle, Input, Button} from '../components/export.js';
import { useNavigate } from 'react-router-dom';

function HomePage(props) {
    let navigate = useNavigate();
    const onClick = (e) => {
        props.setStateObj(prevState => ({...prevState, stateStatus: 'creating owner'}))
        navigate('/join_room');
    }
    
    return (
        <div className="page sign_up_page">
            <Title title="Animeya"></Title>
            <Subtitle subtitle="Make all your dreams come true"></Subtitle>
            <Title title="Sign Up"></Title>
            <Input></Input>
            <Button needs_link={true} onClick={onClick} title="Sign Up"></Button>
        </div>
    );
  }

export default  HomePage;
  
