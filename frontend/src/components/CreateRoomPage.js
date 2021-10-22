import React, { Component } from "react";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import { Typography, Grid, Button, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CreateRoomPage extends Component {
    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
            name: ''
        };
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleRoomButtonPress = this.handleRoomButtonPress.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value
        });
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === 'true' ? true : false
        })
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })

    }

    handleRoomButtonPress() {
        const requestOptions = {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votesToSkip: this.state.votesToSkip,
                guestCanPause: this.state.guestCanPause
            })
        };
        fetch('/api/rooms/add', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(res.json()))
            .catch((err) => console.log("err >>> ", err.json()));
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Create A Room
                    </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align='center'>
                                Guest Control of playback state.
                            </div>
                        </FormHelperText>
                        <RadioGroup row 
                            defaultValue="true"
                            onChange={this.handleGuestCanPauseChange}
                        >
                            <FormControlLabel 
                                value="true" 
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel 
                                value="false" 
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField 
                            required={true} 
                            type="number"
                            defaultValue={this.defaultVotes}
                            inputProps={{
                                min: 1,
                                style: {textAlign: "center"}
                            }}
                            onChange={this.handleVotesChange} 
                        />
                        <FormHelperText>
                            <div align="center">
                                Number of Votes Required To Skip a Song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField 
                            required={true}
                            type="text"
                            inputProps={{
                                placeholder: 'Enter room name here',
                                style: {textAlign: "center"}
                            }}
                            onChange={this.handleNameChange} 
                        />
                        <FormHelperText>
                            <div align="center">
                                Name of Rome
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} align="center">
                    <Button 
                        color="primary"
                        variant="contained"
                        onClick={this.handleRoomButtonPress}
                    >
                            Create A Room
                    </Button>
                </Grid>
                
                <Grid item xs={12} align="center">
                    <Button 
                        color="secondary"
                        variant="contained"
                        to="/"
                        component={Link}>
                            Back
                    </Button>
                </Grid>
            </Grid>
        )
    }
}