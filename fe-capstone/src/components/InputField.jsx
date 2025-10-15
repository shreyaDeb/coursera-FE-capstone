import styles from "./styles";

const InputField = ({ label, name, type = "text", value, onChange, placeholder, error, required }) => {
    const errorId = `${name}-error`;
    return (
        <div style={styles.field}>
            <label htmlFor={name} style={styles.label}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-required={required}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
                style={{
                    ...styles.input,
                    borderColor: error ? "red" : "#ccc",
                }}
            />
            {error && <p id={errorId} style={styles.errorText}>{error}</p>}
        </div>
    );
};

export default InputField