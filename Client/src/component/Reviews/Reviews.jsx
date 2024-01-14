import "./Reviews.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DetailHandler } from "../../handlers/DetailHandler/DetailHandler";

function Reviews() {
  const [review, setReview] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const { onSubmit } = DetailHandler();

  return (
    <>
      <button className="isReview"
        onClick={() => {
          setReview(!review);
        }}
      >
        {!review ? "Deja tu reseña" : "Volver"}
      </button>
      {review && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              required
              name="comment"
              id=""
              cols="30"
              rows="3"
              placeholder="Deja tu reseña ..."
              className={`textarea has-fixed-size  ${
                errors.commentario ? "is-danger" : ""
              } is-link`}
              {...register("commentation", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                minLength: {
                  value: 4,
                  message: "Mínimo 4 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
            ></textarea>
            {errors.commentation && (
              <span className="help is-danger">
                {errors.commentation.message}
              </span>
            )}
            <button className="send"
              onClick={() => {
                setTimeout(() => {
                  reset();
                }, 1500);
              }}
            >
              Enviar reseña
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default Reviews;
