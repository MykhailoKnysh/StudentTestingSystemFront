import React from 'react';
import {Button, Grid, Link, MenuItem, Paper, Tab, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import {NavLink} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {StudentsTest, Subject, SubjectTheme} from "../config";
import {StudentTestMock} from "./studentTestMock";
import {TestItem} from "./testItem";

type Props = {
    subjects: Subject[],
    themes: SubjectTheme[],
    handleCurrentThemeId: React.Dispatch<React.SetStateAction<string>>
}

const CompletedTests = (props: Props) => {
    const {subjects, themes, handleCurrentThemeId} = props;

    const [currentSubjectId, setCurrentSubjectId] = React.useState<string>('');
    const [currentThemeId, setCurrentThemeId] = React.useState<string>('');
    const [studentTests, setStudentTests] = React.useState<StudentsTest[]>(StudentTestMock);

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSubjectId(event.target.value);
        setCurrentThemeId('');
    }

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentThemeId(event.target.value);
        handleCurrentThemeId(event.target.value);
    }

    return (
        <Paper elevation={3} sx={{ maxWidth: '800px', mx: 'auto', p:2}}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={0}>
                            <Tab label="Completed Tests" />
                        </Tabs>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/teacher/tests/share" key="completedTests" component={NavLink} sx={{ textDecoration: 'none' }}>
                        <Button fullWidth variant="contained" color="primary" disabled={currentThemeId === ''}>
                            Share test
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        select
                        fullWidth
                        label="Subject"
                        id="select-subject"
                        value={currentSubjectId}
                        onChange={handleSubjectChange}
                    >
                        {subjects.map((subject) =>
                            <MenuItem key={subject.id} value={subject.id}>{subject.title}</MenuItem>
                        )}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        select
                        fullWidth
                        label="Themes"
                        id="select-themes"
                        value={currentThemeId}
                        onChange={handleThemeChange}
                    >
                        {themes.map((theme) => (theme.subjectId === currentSubjectId) &&
                            <MenuItem key={theme.id} value={theme.id}>{theme.title}</MenuItem>
                        )}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                {studentTests.map((test) => (test.idTheme === currentThemeId) &&
                    <Grid item xs={12}>
                        <TestItem key={test.id} test={test} />
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default CompletedTests;