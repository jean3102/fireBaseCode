import DashboardContentComponent from "./layout/DashboardContentComponent";



const HomeComponent = () => {

    return (
        <DashboardContentComponent>
            <section style={{
                display: 'grid',
                placeItems: 'center',
                width: '100%',
            }}>
                <p><a href="https://jeancarlos.optimusservices94.com/">➡️ Click here to Go to my Portfolio</a></p>

            </section>
        </DashboardContentComponent >
    );
}

export default HomeComponent