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
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import "./App.css";
import { Link } from "@material-ui/core";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

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

  const [state, setState] = React.useState();
  const [con, setCon] = React.useState({});
  const [border, setBorder] = React.useState([]);
  const [lang, setLang] = React.useState([]);

  const toggleDrawer = (open, cont) => (event) => {
    setState(open);
    setCon(cont);
    console.log(cont);
    if (open === true) {
      setBorder(cont.borders);
      setLang(cont.languages);
    }
  };

  const list = (names) => (
    <div
      role="presentation"
      onClick={toggleDrawer(false, {})}
      onKeyDown={toggleDrawer(false, {})}
    >
      <List>
        <ListItem button>Country : {names.name}</ListItem>
        <ListItem button>Capital : {names.capital}</ListItem>
        <ListItem button>Region : {names.region}</ListItem>
        <ListItem button>Subregion : {names.subregion}</ListItem>
        <ListItem button>Area : {names.area}</ListItem>
        <ListItem button>Timezones : {names.timezones + " "}</ListItem>
        <ListItem button>
          <ListItemText primary="Borders" />
        </ListItem>
        {border.map((text, i) => (
          <ListItem button className={classes.nested} key={"text-" + i}>
            <ListItemText secondary={text} />
          </ListItem>
        ))}
        <ListItem button>
          <ListItemText primary="Languages" />
        </ListItem>
        {lang.map((text, index) => (
          <ListItem button className={classes.nested} key={index}>
            <ListItemText secondary={text.name} />
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
                      <div>
                        <Link onClick={toggleDrawer(true, country)}>
                          {country.name}
                        </Link>
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
                <Drawer
                  anchor={"right"}
                  open={state}
                  onClose={toggleDrawer(false, {})}
                >
                  {list(con)}
                </Drawer>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
