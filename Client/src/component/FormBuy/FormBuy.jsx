import "./FormBuy.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CartHandler from "../../handlers/CartHandler/CartHandler";

function FormBuy() {
  const { checkBook } = CartHandler();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="columns">
      <div className="column is-three-quarters">
        <form onSubmit={handleSubmit(checkBook)}>
          <input
            className={`input ${errors.name ? "is-danger" : ""} input is-link`}
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Nombre requerido",
              },
              minLength: {
                value: 2,
                message: "Mínimo dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "Máximo 20 caracteres",
              },
            })}
            placeholder="Tu nombre aqui"
          />
          {errors.name && (
            <span className="help is-danger">{errors.name.message}</span>
          )}

          <input
            className={`input ${errors.email ? "is-danger" : ""} input is-link`}
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email requerido",
              },
              minLength: {
                value: 10,
                message: "Mínimo 10 caracteres",
              },
              maxLength: {
                value: 30,
                message: "Máximo 20 caracteres",
              },
            })}
            placeholder="Tu email aqui"
          />
          {errors.email && (
            <span className="help is-danger">{errors.email.message}</span>
          )}

          <input
            className={`input ${
              errors.address ? "is-danger" : ""
            } input is-link`}
            type="text"
            {...register("address", {
              required: {
                value: true,
                message: "Direccion requerida",
              },
              minLength: {
                value: 4,
                message: "Mínimo 4 caracteres",
              },
              maxLength: {
                value: 20,
                message: "Máximo 20 caracteres",
              },
            })}
            placeholder="tu direccion de entrega"
          />
          {errors.address && (
            <span className="help is-danger">{errors.address.message}</span>
          )}

          <input
            className={`input ${errors.phone ? "is-danger" : ""} input is-link`}
            type="text"
            {...register("phone", {
              required: {
                value: true,
                message: "Numero telefonico requerido",
              },
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
              maxLength: {
                value: 30,
                message: "Máximo 20 caracteres",
              },
            })}
            placeholder="Tu numero celular aqui"
          />
          {errors.phone && (
            <span className="help is-danger">{errors.phone.message}</span>
          )}

          <button
            className="button is-primary"
            onClick={() => {
              navigate("/payment");
            }}
          >
            Finalizar compra
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormBuy;
