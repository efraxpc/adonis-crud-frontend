import React from "react";
import { withStyles, TextField, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import Styles from "../style/Styles.js";

const CreateData = props => {
  const {
    Id,
    Name,
    Ocupation,
    Description,
    handleChange,
    addData,
    saveUpdate,
    classes,
    isEditing
  } = props;

  return (
    <div className={classes.formWrapper}>
      <form onSubmit={addData}>
        <TextField
          id="name-id"
          name="Name"
          label="Nome"
          onChange={handleChange}
          value={Name}
          fullWidth
          required
        />
        <TextField
          id="occupation-id"
          name="Ocupation"
          label="Ocupaçao"
          onChange={handleChange}
          value={Ocupation}
          fullWidth
          required
        />
        <TextField
          id="desc-id"
          name="Description"
          label="Descriçao"
          onChange={handleChange}
          value={Description}
          fullWidth
          required
        />
        {isEditing ? (
          <Button
            type="Salvar"
            variant="outlined"
            className={classes.button}
            onClick={e => saveUpdate(e, Id)}
            fullWidth
          >
            Atualizar
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outlined"
            className={classes.button}
            fullWidth
          >
            Salvar
          </Button>
        )}
      </form>
    </div>
  );
};

CreateData.propTypes = {
  classes: PropTypes.object.isRequired,
  Id: PropTypes.number,
  Name: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  Occupation: PropTypes.string.isRequired,
  addData: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  saveUpdate: PropTypes.func.isRequired
};

export default withStyles(Styles)(CreateData);
