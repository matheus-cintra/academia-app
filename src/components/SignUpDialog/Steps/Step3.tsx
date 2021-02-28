import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { getMembershipTypes } from '../methods';
import useStyles from './styles';

const Step3: any = (props: any) => {
  const classes = useStyles();
  const [selectedCard, setSelectedCard] = useState({
    card: 'none',
  });

  const handleChange = (type: string, event: any) => {
    props.setState(type, event);
  };

  const handleSubscriptionAdd = (type: string) => {
    handleChange('subscription', { target: { value: type } });
    setSelectedCard({ card: type });
  };

  const plans = getMembershipTypes();

  return (
    <Grid container>
      <Grid item xs={12} component={Paper} className={classes.paperComponent} elevation={0} square>
        <div className={classes.cardContainer}>
          {plans.map(plan => (
            <Card
              key={plan.key}
              variant="outlined"
              className={classes.cardRoot}
              style={{
                opacity: (selectedCard.card !== 'none' && selectedCard.card !== plan.key) || !plan.enabled ? 0.5 : 1,
                border: selectedCard.card === plan.key ? '3px solid #545585' : undefined,
              }}
            >
              <CardContent className={classes.cardContent}>
                <Typography className={classes.title} color="textSecondary">
                  {plan.name}
                </Typography>
                <div className={classes.priceContainer}>
                  <Typography className={classes.price}>{plan.price}</Typography>
                </div>
                <Typography className={classes.pos} color="textSecondary">
                  Funcionalidades
                </Typography>
                <List component="nav">
                  <ListItem>
                    <ListItemIcon>{plan.membersIcon}</ListItemIcon>
                    <ListItemText primary={plan.membersText} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>{plan.membershipIcon}</ListItemIcon>
                    <ListItemText
                      primary={plan.membershipText}
                      className={plan.hasMembership ? undefined : classes.blockedItem}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>{plan.notifyLateIcon}</ListItemIcon>
                    <ListItemText
                      primary={plan.notifyLateText}
                      className={plan.hasNotification ? undefined : classes.blockedItem}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>{plan.invoicingIcon}</ListItemIcon>
                    <ListItemText
                      primary={plan.invoicingText}
                      className={plan.hasInvoicing ? undefined : classes.blockedItem}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>{plan.costsIcon}</ListItemIcon>
                    <ListItemText
                      primary={plan.costsText}
                      className={plan.hasCosts ? undefined : classes.blockedItem}
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions className={classes.selectButtonContainer}>
                <Button
                  disabled={!plan.enabled}
                  size="large"
                  className={classes.selectButton}
                  style={{ color: '#fff' }}
                  onClick={() => handleSubscriptionAdd(plan.key)}
                >
                  SELECIONAR
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default Step3;
