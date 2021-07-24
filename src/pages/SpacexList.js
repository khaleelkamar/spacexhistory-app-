import { Box, Container } from '@material-ui/core';
import SpacexListResults from 'src/components/core/SpacexListResults';

const SpacexList = () => (
  <>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <SpacexListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default SpacexList;
