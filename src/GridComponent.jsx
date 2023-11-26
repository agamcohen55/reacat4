import React, { useState } from 'react';
import { Paper, Grid, Button, Typography } from '@mui/material';

const GridComponent = () => {
    // יצירת סטייטים לנקודת התחלה ונקודת סוף
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    // פונקציה לחישוב מרחק מנהטן
    const manhattanDistance = (point1, point2) => {
        return Math.abs(point1.row - point2.row) + Math.abs(point1.col - point2.col);
    };

    // פונקציה לבחירת נקודה
    const selectPoint = (row, col) => {
        if (!start) {
            setStart({ row, col });
        } else if (!end) {
            setEnd({ row, col });
        }
    };

    // פונקציה לאיפוס הגריד
    const resetGrid = () => {
        setStart(null);
        setEnd(null);
    };

    // יצירת הגריד עם הנקודות
    const renderGrid = () => {
        const gridSize = 10;
        let grid = [];

        for (let row = 0; row < gridSize; row++) {
            let cols = [];
            for (let col = 0; col < gridSize; col++) {
                let isSelected = (start && start.row === row && start.col === col) ||
                                 (end && end.row === row && end.col === col);
                
                cols.push(
                    <Grid item xs={1} key={col}>
                        <Paper
                            style={{
                                height: 40,
                                backgroundColor: isSelected ? (start.row === row && start.col === col ? 'green' : 'red') : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => selectPoint(row, col)}
                        />
                    </Grid>
                );
            }
            grid.push(<Grid container item spacing={1} key={row}>{cols}</Grid>);
        }
        return grid;
    };

    return (
        <div>
            <Paper style={{ padding: 20, marginBottom: 20 }}>
                <Button variant="contained" color="primary" onClick={resetGrid}>
                    Reset Grid
                </Button>
                {start && end && (
                    <Typography variant="h6" style={{ marginTop: 15 }}>
                        Distance: {manhattanDistance(start, end)}
                    </Typography>
                )}
            </Paper>
            <Grid container spacing={1}>
                {renderGrid()}
            </Grid>
        </div>
    );
};

export default GridComponent;
