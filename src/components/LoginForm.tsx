import { Resolver, useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  verify: string;
};

const url = `https://login.salesforce.com/services/auth/headless/init/registration`;

const resolver: Resolver<FormValues> = async (values) => {
  let err = {};

  if (!values.firstName) {
    err = {
      firstName: {
        type: "required",
        message: "This is required.",
      },
    };
  } else if (!values.lastName) {
    err = {
      lastName: {
        type: "required",
        message: "This is required.",
      },
    };
  } else if (!values.email) {
    err = {
      email: {
        type: "required",
        message: "This is required.",
      },
    };
  } else if (!values.password) {
    err = {
      password: {
        type: "required",
        message: "This is required.",
      },
    };
  } else if (!values.confirmPassword) {
    err = {
      confirmPassword: {
        type: "required",
        message: "This is required.",
      },
    };
  } else if (!values.verify) {
    err = {
      verify: {
        type: "required",
        message: "This is required.",
      },
    };
  } else if (values.confirmPassword !== values.password) {
    err = {
      confirmPassword: {
        type: "mismatch",
        message: "Your passwords don't match",
      },
    };
  }

  return {
    values: values.firstName ? values : {},
    errors: err,
  };
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit((data) => {
    const postData = {
      userdata: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
      },
      customdata: {
        mobilePhone: "+12035408967",
        streetAddress: "12 N Lands End Rd",
        city: "Lantana",
        state: "Florida",
        zip: "20537",
        privacyPolicy: true,
      },
      password: data.password,
      recaptcha: "<recaptcha-token>",
      verificationmethod: data.verify,
    };
    fetch("");
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="firstName">
        First Name
        <input id="firstName" {...register("firstName")} placeholder="Bill" />
        {errors?.firstName && <p>{errors.firstName.message}</p>}
      </label>
      <label htmlFor="lastName">
        Last Name
        <input id="lastName" {...register("lastName")} placeholder="Luo" />
        {errors?.lastName && <p>{errors.lastName.message}</p>}
      </label>

      <label htmlFor="email">
        Email:
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="bill@gmail.com"
        />
        {errors?.email && <p>{errors.email.message}</p>}
      </label>

      <label htmlFor="username">
        Username:
        <input
          {...register("username")}
          id="username"
          type="email"
          placeholder="bill@gmail.com"
        />
        {errors?.username && <p>{errors.username.message}</p>}
      </label>

      <label htmlFor="password">
        Password:
        <input id="password" {...register("password")} type="password" />
        {errors?.password && <p>{errors.password.message}</p>}
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password:
        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
        />
        {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </label>

      <label htmlFor="verify">
        Verify With
        <select id="verify" {...register("verify")}>
          <option>email</option>
          <option>password</option>
        </select>
      </label>
      <input type="submit" />
    </form>
  );
}
