
export default function Item({ params }: { params: { id: string } }) {
    const { id } = params

    return (
        <h1>Item {id}</h1>
    )
}