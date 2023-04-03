import React from "react"
import { Box, Button ,Link } from "@admin-bro/design-system";

import {
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
  } from '@admin-bro/design-system'

const Download=()=>{
    
    return(
        <>
        <Box  flex justifyItems={"flex-end"} bg="white" paddingLeft="1029px">
            <Button>
                <Link href="/download-excel">
                Export to excel
                </Link>
            </Button>
        </Box>
        <Box bg="white" pt="4px" alignContent="center" justifyContent="center">
            <Table border="1px black solid">
                <TableHead>
                    <TableRow>
                        <TableCell>Tilte</TableCell>
                        <TableCell>id</TableCell>
                        <TableCell>Wrong answer</TableCell>
                        <TableCell>Correct Answer</TableCell>
                        <TableCell>Username</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Phishing and Email Security</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>Chandran</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>The Beginners Cyber Security Quiz</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>ravichandran</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </Box>
            </>
    )
   
}
export default Download