import { Container } from "@mui/material";
import QrGenerationBox from "./QrGenerationBox"

const Home = () => {
    return (
        <Container sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <QrGenerationBox />
        </Container >
    )
}

export default Home;