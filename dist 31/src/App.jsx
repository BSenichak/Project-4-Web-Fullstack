import {
    Divider,
    Grid2,
    List,
    ListItem,
    Paper,
    Typography,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import Header from "./Header";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LabelIcon from "@mui/icons-material/Label";
import { useTheme } from "@emotion/react";
function App({ theme, setTheme }) {
    let bgColor = useTheme().palette.background.default;
    return (
        <>
            <Header theme={theme} setTheme={setTheme} />
            <Grid2
                container
                spacing={2}
                sx={{ padding: "20px", backgroundColor: bgColor }}
            >
                <Grid2 item size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ padding: "20px" }}>
                        <img
                            src="https://res.cloudinary.com/teepublic/image/private/s--JonjIaTd--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/t_watermark_lock/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1587007775/production/designs/9151401_0.jpg"
                            alt=""
                            style={{ width: "100%" }}
                        />
                    </Paper>
                </Grid2>
                <Grid2 item size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ padding: "20px" }}>
                        <Typography variant="h4">
                            Robocat Robocodovych
                        </Typography>
                        <Divider />
                        <Typography variant="h5" sx={{ marginTop: "20px" }}>
                            About me
                        </Typography>
                        <Typography variant="body1">
                            I'm a web developer with a twist - I'm a robotic
                            cat! My journey started in the digital realm, where
                            I found my passion for coding. I specialize in
                            creating sleek, user-friendly websites, and I'm
                            always on the lookout for new challenges to conquer.
                            My metal paws are swift on the keyboard, and my
                            laser-sharp focus helps me debug code in no time.
                            When I'm not coding, I enjoy recharging with a good
                            book on AI advancements. Let's build the future, one
                            line of code at a time!
                        </Typography>
                        <Typography variant="h5" sx={{ marginTop: "20px" }}>
                            My work
                        </Typography>
                        <Typography variant="body1">
                            My latest projects include a website for a local cat
                            cafe, a chatbot for a pet food company, and a
                            weather app for cats. I'm always looking for new
                            opportunities to create fun and useful apps.
                        </Typography>
                        <Typography variant="h5" sx={{ marginTop: "20px" }}>
                            Follow me
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ display: "flex", gap: "10px" }}
                        >
                            <a
                                href="#"
                                style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <LinkedInIcon />
                            </a>
                            <a
                                href="#"
                                style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <GitHubIcon />
                            </a>
                            <a
                                href="#"
                                style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <FacebookIcon />
                            </a>
                            <a
                                href="#"
                                style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <XIcon />
                            </a>
                        </Typography>
                    </Paper>
                </Grid2>
                <Grid2 item size={{ xs: 12, md: 12 }}>
                    <Paper sx={{ padding: "20px" }}>
                        <Typography variant="h5">My skills</Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>HTML</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>CSS</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>JavaScript</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>React</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>Node.js</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>Express.js</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>mySQl</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>MUI</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>Redux</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText>React Router</ListItemText>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid2>
            </Grid2>
        </>
    );
}

export default App;
