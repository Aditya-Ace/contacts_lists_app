const Button = ({ color, backgroundColor, title, type, onClick, ...other }) => (
  <div className="button">
    <button
      type={type || 'button'}
      style={{ color, backgroundColor }}
      onClick={onClick}
      {...other}
    >
      {title}
    </button>
  </div>
)

export default Button
