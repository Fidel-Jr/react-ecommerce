import Header from "../components/Header";

function NotFoundPage({cart}) {
    return (
        <>
            <Header cart={cart} />
            <div style={{marginTop: '100px'}}>
                <h2 className="text-light">Page Not Found</h2>
            </div>
        </>
    )
}

export default NotFoundPage;