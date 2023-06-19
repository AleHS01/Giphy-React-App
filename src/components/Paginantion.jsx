const Paginantion = (props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalItems / props.gifPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="page-navigation-nav">
      <ul className="page-navigation-ul">
        {pageNumbers.map((number) => {
          let classes = "page-button-item ";
          if (number === props.currentPage) {
            classes += "active";
          }
          return (
            <li key={number} className={classes}>
              <a onClick={() => props.pageSelected(number)} href="#">
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginantion;
