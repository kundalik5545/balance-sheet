export default function DisplayData({ onEdit }) {
  const data = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
  ];

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <span>
            {item.name} - {item.age}
          </span>
          <button onClick={() => onEdit(item)}>Edit</button>
        </div>
      ))}
    </div>
  );
}
