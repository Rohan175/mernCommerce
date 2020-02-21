import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),    
  },buttonicon: {
    marginRight: theme.spacing(4),    
    color: "white"
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Cart({Cart,addToCart,subToCart,addUnsafe,subUnsafe}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography style={{flex:1}} variant="h6" color="inherit" noWrap>
            <Link href="/home" variant="h6" color="inherit" >
              Products
            </Link>
          </Typography>   
          <Button
            className={classes.buttonicon}
            variant="text"
            href="/login"
            onClick={()=>localStorage.removeItem("auth")}
            startIcon={<ExitToAppIcon/>}
          >
            Logout
          </Button>
          
        </Toolbar>

      </AppBar>
      <main>
      {!Cart?
        (<div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Cart
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Add a product to Cart
              </Typography>
            </Container>
        </div>):
        (<Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            { console.log("-------->",Cart)}
            {Cart.data.map(card => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                       {"Qty : "+card.qty}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary"
                      startIcon={<AddCircleOutlineIcon/>}
                      onClick={(e)=>{
                        addUnsafe(card._id,1)
                        addToCart(card._id,1,card.price,card.productname)
                      }
                    }
                    >
                      Add
                    </Button>
                    <Button size="small" color="primary"
                      startIcon={<RemoveCircleOutlineIcon/>}
                      onClick={(e)=>{
                        subUnsafe(card._id,1)
                        subToCart(card._id,1,card.price,card.productname)
                      }
                    }
                    >
                      Sub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>)}
      </main>
    </React.Fragment>
  );
}
