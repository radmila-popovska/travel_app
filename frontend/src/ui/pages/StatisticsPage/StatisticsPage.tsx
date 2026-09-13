import { useMemo } from 'react';
import {
    Box, Container, Typography, Grid, Card, CardContent, Chip, CircularProgress
} from '@mui/material';
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HotelIcon from '@mui/icons-material/Hotel';
import BarChartIcon from '@mui/icons-material/BarChart';
import useAccommodations from '../../../hooks/useAccommodations.ts';

const GOOD_COLOR = '#4caf50';
const BAD_COLOR = '#f44336';

const StatisticsPage = () => {
    const { accommodations, loading } = useAccommodations();

    const stats = useMemo(() => {
        if (!accommodations.length) return null;

        const good = accommodations.filter(a => a.condition?.toLowerCase() === 'good').length;
        const bad = accommodations.filter(a => a.condition?.toLowerCase() !== 'good').length;

        const conditionData = [
            { name: 'Good', value: good },
            { name: 'Bad', value: bad },
        ];

        const categoryMap: Record<string, { good: number; bad: number }> = {};
        for (const a of accommodations) {
            const cat = a.category || 'Unknown';
            if (!categoryMap[cat]) categoryMap[cat] = { good: 0, bad: 0 };
            if (a.condition?.toLowerCase() === 'good') categoryMap[cat].good++;
            else categoryMap[cat].bad++;
        }
        const categoryData = Object.entries(categoryMap).map(([name, v]) => ({ name, ...v }));

        return { good, bad, total: accommodations.length, conditionData, categoryData };
    }, [accommodations]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 6, background: 'linear-gradient(135deg, #0b3b5a 0%, #737285 50%, #cfd2d9 100%)' }}>
            <Container maxWidth="lg">

                {/* Header */}
                <Box sx={{ mb: 5, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <BarChartIcon sx={{ color: 'white', fontSize: 36 }} />
                        <Typography variant="h3" sx={{ color: 'white', fontWeight: 800 }}>
                            Statistics
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                        Accommodation condition overview
                    </Typography>
                </Box>

                {/* Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 5 }}>
                    {[
                        { label: 'Total', value: stats?.total ?? 0, icon: <HotelIcon />, color: '#1976d2', bg: '#e3f2fd' },
                        { label: 'Good Condition', value: stats?.good ?? 0, icon: <CheckCircleIcon />, color: GOOD_COLOR, bg: '#e8f5e9' },
                        { label: 'Bad Condition', value: stats?.bad ?? 0, icon: <CancelIcon />, color: BAD_COLOR, bg: '#ffebee' },
                    ].map((s) => (
                        <Grid key={s.label} size={{ xs: 12, sm: 4 }}>
                            <Card sx={{ borderRadius: 3, boxShadow: 4, height: '100%' }}>
                                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                    <Box sx={{ color: s.color, mb: 1, '& svg': { fontSize: 40 } }}>{s.icon}</Box>
                                    <Typography variant="h3" sx={{ fontWeight: 800, color: s.color }}>{s.value}</Typography>
                                    <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>{s.label}</Typography>
                                    {stats?.total ? (
                                        <Chip
                                            label={`${Math.round((s.value / stats.total) * 100)}%`}
                                            size="small"
                                            sx={{ mt: 1, bgcolor: s.bg, color: s.color, fontWeight: 700 }}
                                        />
                                    ) : null}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Charts */}
                <Grid container spacing={4}>

                    {/* Pie Chart */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                    Condition Distribution
                                </Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={stats?.conditionData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={110}
                                            innerRadius={55}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            labelLine={true}
                                        >
                                            <Cell fill={GOOD_COLOR} />
                                            <Cell fill={BAD_COLOR} />
                                        </Pie>
                                        <Tooltip formatter={(val) => [`${val} accommodations`]} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Bar Chart by Category */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                    Condition by Category
                                </Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={stats?.categoryData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="good" name="Good" fill={GOOD_COLOR} radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="bad" name="Bad" fill={BAD_COLOR} radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Horizontal Stacked Bar */}
                    <Grid size={{ xs: 12 }}>
                        <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                                    Breakdown by Category
                                </Typography>
                                <ResponsiveContainer width="100%" height={260}>
                                    <BarChart data={stats?.categoryData} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" allowDecimals={false} />
                                        <YAxis type="category" dataKey="name" tick={{ fontSize: 13, fontWeight: 600 }} width={90} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="good" name="Good" stackId="a" fill={GOOD_COLOR} />
                                        <Bar dataKey="bad" name="Bad" stackId="a" fill={BAD_COLOR} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default StatisticsPage;