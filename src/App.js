import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Container, Typography } from '@mui/material';
import './App.css';

const SingleAutocomplete = () => {
  const [selectedOptions, setSelectedOptions] = useState([[], [], []]); // Array of selected options for each Autocomplete
  const [errors, setErrors] = useState([false, false, false]); // Array of error states for each Autocomplete

  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  const handleOptionChange = (index) => (event, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
    // Add your validation logic here
    const newErrors = [...errors];
    newErrors[index] = !value;
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const isValid = selectedOptions.every((options) => options.length > 0);
    if (isValid) {
      console.log('Selected options:', selectedOptions);
      // Perform further actions here (e.g., submit form)
    } else {
      console.log('Please select options for all Autocomplete fields.');
      // Optionally, you can display a message to the user or highlight the invalid fields
      setErrors(errors.map((error) => !error));
    }
  };

  return (
    <div className="mainHead">
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom >
        Single Autocomplete with Validation
      </Typography>
      {[0, 1, 2].map((index) => (
        <div key={index} style={{ marginTop: '30px' }}>
          <Autocomplete
            multiple
            value={selectedOptions[index]}
            onChange={handleOptionChange(index)}
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Select options ${index + 1}`}
                variant="outlined"
                error={errors[index]}
                helperText={errors[index] ? 'Please select an option' : ''}
              />
            )}
          />
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Submit
      </Button>
    </Container>
    </div>
  );
};

export default SingleAutocomplete;