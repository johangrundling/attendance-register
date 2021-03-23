import styled from "styled-components";
import { InputLabel, FormControl } from "@material-ui/core";

export const StyledInputLabel = styled(InputLabel)`
  && {
    .req-label {
      color: #f44336;
    }
  }
`;

export const StyledFormControl = styled(FormControl)`
  && {
    width: 100%;
    display: block;
    position: relative;
  }
`;