import "../styles/SelectColor.scss";

export default function SelectColor({ setData, data }) {
  return (
    <select
      required
      name=""
      id=""
      defaultValue="default"
      className="select__color"
      onChange={(e) => setData({ ...data, color: e.target.value })}
    >
      <option value="default" disabled>
        --Selecciona un color--
      </option>
      <option
        value="gray"
        style={{ backgroundColor: "#333533", color: "white" }}
      >
        Gris
      </option>

      <option
        value="red"
        style={{ backgroundColor: "#ff3649", color: "white" }}
      >
        Rojo
      </option>

      <option
        value="green"
        style={{ backgroundColor: "#054105", color: "white" }}
      >
        Verde
      </option>

      <option
        value="orange"
        style={{ backgroundColor: "#c96609", color: "white" }}
      >
        Naranja
      </option>

      <option
        value="pink"
        style={{ backgroundColor: "#ff00ff", color: "white" }}
      >
        Rosa
      </option>

      <option
        value="blueLight"
        style={{ backgroundColor: "#086464", color: "white" }}
      >
        Azul
      </option>

      <option
        value="purple"
        style={{ backgroundColor: "#570653", color: "white" }}
      >
        Morado
      </option>
    </select>
  );
}
