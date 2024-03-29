import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import CasesCard from './CasesCard';
import PopularCard from './PopularCard';
import RecoveryCard from './RecoveryCard';
import DeathCard from './DeathCard';

import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../../firebase/firebase';
//axios
import axios from 'axios';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [cases, setCases] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [recovered, setRecovered] = useState(0);
    const [everydayCases, setEverydayCases] = useState(null);
    const [injectionState, setInjectionState] = useState(null);
    const [infectionState, setInfectionState] = useState(null);

    useEffect(() => {
        setLoading(false);
        const fetchCases = async () => {
            const { data } = await axios.post(
                `https://static.pipezero.com/covid/data.json`
            );
            setCases(data.total.internal.cases);
            setDeaths(data.total.internal.death);
            setRecovered(data.total.internal.recovered);
            setEverydayCases(data.overview);
        };

        fetchCases();

        const getData = async () => {
            const docSnap = await getDoc(doc(db, "localStatData", "data"))
            if (docSnap.exists()) {
                setInjectionState(docSnap.data().overview);
                setInfectionState(docSnap.data().infectionStat);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        getData();
    }, [cases, deaths, recovered]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <CasesCard cases={cases} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <RecoveryCard recovered={recovered} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <DeathCard deaths={deaths} isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={9}>
                        <PopularCard isLoading={isLoading}  injectionState={injectionState} infectionState={infectionState}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TotalGrowthBarChart everydayCases={everydayCases} isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
