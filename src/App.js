import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import "./App.css";
import { Link } from "@material-ui/core";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const classes = useStyles();

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <TableRow>
                    <TableCell align="left">
                      <div key="right">
                        <Link onClick={toggleDrawer("right", true)}>
                          {country.name}
                        </Link>
                        <Drawer
                          anchor={"right"}
                          open={state["right"]}
                          onClose={toggleDrawer("right", false)}
                        >
                          {list("right")}
                        </Drawer>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <img src={country.flag} alt="" width="32px" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {country.capital}
                    </TableCell>

                    <TableCell align="left">{country.population}</TableCell>
                    <TableCell align="left">{country.region}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
