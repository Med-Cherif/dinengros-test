import Grid from "@component/grid/Grid";
import TextField from "@component/text-field/TextField";
import React from "react";

interface IProps {
  formik: any;
}

const DeliveryAddressInputs = ({ formik }: IProps) => {
  return (
    <Grid container horizontal_spacing={6} vertical_spacing={4}>
      <Grid item xs={12}>
        <TextField
          name="name"
          label="Contact"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name || ""}
          errorText={formik.touched.name && formik.errors.name}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          name="phone"
          label="Phone"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone || ""}
          errorText={formik.touched.phone && formik.errors.phone}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          name="city"
          label="City"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.city || ""}
          errorText={formik.touched.city && formik.errors.city}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          name="street_name"
          label="Street Name"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.street_name || ""}
          errorText={formik.touched.street_name && formik.errors.street_name}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          name="zip_code"
          label="Postal Code"
          fullwidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.zip_code || ""}
          errorText={formik.touched.zip_code && formik.errors.zip_code}
        />
      </Grid>
    </Grid>
  );
};

export default DeliveryAddressInputs;
