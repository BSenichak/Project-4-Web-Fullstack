import { Button, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function App() {
    let [follow, setFollow] = useState(false);
    return (
        <Wrapper>
            <Header
                backimg={
                    "https://images3.alphacoders.com/132/thumb-1920-1321959.png"
                }
            >
                <HeaderInner>
                    <Logo src="https://img.icons8.com/?size=512&id=f1ZPU9Xpm8Dh&format=png" />
                    <UserPicture src="https://shop.mattel.com/cdn/shop/files/jljiq8mxiwfmk9ci4qa9_94695617-6ee0-4564-a845-d7d3a8b2a722.png?v=1717531380" />
                    <UserInfoBar>
                        <Typography variant="h4">
                            Robocat Minecraftovych
                        </Typography>
                        <Typography variant="body1">RoboCreeper</Typography>
<LevelBar variant="body1" lvl={10}>
    LvL 10
</LevelBar>
<MyButton
    variant="contained"
    onClick={() => setFollow(!follow)}
    follow={follow}
>
    {follow ? "Unfollow" : "Follow"}
</MyButton>
                    </UserInfoBar>
                </HeaderInner>
            </Header>
        </Wrapper>
    );
}

export default App;

let Wrapper = styled(Box)`
    background-color: ${(props) => props.theme.palette.background.default};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

let Header = styled(Box)`
    background-image: ${({ backimg }) => `url("${backimg}")`};
    background-size: cover;
    background-position: center;
    height: 40vh;
`;

let HeaderInner = styled(Box)`
    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.014),
        ${(props) => props.theme.palette.background.default}
    );
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

let Logo = styled("img")`
    height: 5vh;
    position: absolute;
    left: 2rem;
    top: 2rem;
`;

let UserInfoBar = styled(Box)`
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${(props) => props.theme.palette.text.primary};
    flex-basis: 50%;
`;

let UserPicture = styled("img")`
    height: 15vh;
    width: 15vh;
    object-fit: cover;
    border-radius: 50%;
`;

let MyButton = styled(Button)`
    background-color: ${(props) =>
        props.follow
            ? props.theme.palette.secondary.main
            : props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.text.primary};
`;

let LevelBar = styled(Typography)`
    color: ${(props) => {
        let lvl = props.lvl;
        if (lvl < 10) {
            return props.theme.palette.primary.main;
        } else if (lvl < 20) {
            return props.theme.palette.warning.main;
        } else {
            return props.theme.palette.error.main;
        }
    }};
    font-weight: bold;
    margin: 1rem 0;
`;
