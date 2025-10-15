import styles from "./styles";

const SelectField = ({ label, name, value, onChange, options, error, required }) => {
    const errorId = `${name}-error`;
    return (
        <div style={styles.field}>
            <label htmlFor={name} style={styles.label}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                aria-required={required}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
                style={{
                    ...styles.input,
                    borderColor: error ? "red" : "#ccc",
                }}
            >
                <option value="">Select {label}</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            {error && <p id={errorId} style={styles.errorText}>{error}</p>}
        </div>
    );
};

export default SelectField