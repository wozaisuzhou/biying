import Link from "next/link";

const CategoryCard = (props) => {
  return (
    <Link href={`/order/${props.category}`}>
      <div className="card w-80 bg-base-60 shadow-xl hover:bg-red-400">
        <figure>
          <img className="h-60" src={props.image} alt={props.altMessage} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p>{props.services} </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
