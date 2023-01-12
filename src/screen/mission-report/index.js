import React, {useEffect, useRef, useState} from 'react';
import {Block, Button, Input, Text} from '../../components';
import Header from '../../components/common/header';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {divider} from '../../utils/commonView';
import CommonApi from '../../utils/CommonApi';
import moment from 'moment';
import {t1, t2, w3} from '../../components/theme/fontsize';
import {
  strictValidObjectWithKeys,
  strictValidString,
} from '../../utils/commonUtils';
import {ActivityIndicator, Image, ScrollView} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Feedback from './feedback';
import {useNavigation} from '@react-navigation/core';
import {config} from '../../utils/config';
import {useSelector} from 'react-redux';

const MissionReport = ({
  route: {
    params: {item = {}},
  },
}) => {
  const [missionReport, setMissionReport] = useState({});
  const modalizeRef = useRef();
  const navigation = useNavigation();
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {
    MissionReportHeader,
    Description,
    IbanNum,
    MissionTypeHeader,
    EditFeedback,
    GiveFeedback,
  } = languageMode;
  useEffect(() => {
    CommonApi.fetchAppCommon(`/customer/mission-details/${item.id}`, 'get', '')
      .then((response) => {
        if (response.status === 1) {
          setMissionReport(response.data);
        }
      })
      .catch(() => {});
  }, [item.id]);

  const formatDate = (d) => {
    return moment(d).format('YYYY-MM-DD');
  };
  const renderDetails = (header, content) => {
    return (
      <Block center margin={[hp(0.5), 0]} flex={false} row space={'between'}>
        <Text color="#000000" size={16} regular>
          {header}
        </Text>
        <Text regular grey size={16}>
          {content}
        </Text>
      </Block>
    );
  };
  const {report} = missionReport;
  if (!strictValidObjectWithKeys(missionReport)) {
    return (
      <Block>
        <Header centerText={MissionReportHeader} leftIcon={false} />
        <Block center middle>
          <ActivityIndicator color="#000" size="large" />
        </Block>
      </Block>
    );
  } else {
    return (
      <Block white>
        <Header centerText={MissionReportHeader} leftIcon={false} />
        <ScrollView
          contentContainerStyle={{backgroundColor: '#fff'}}
          style={{backgroundColor: '#fff'}}>
          <Text margin={[t1, 0]} center size={14} grey semibold>
            {IbanNum}
          </Text>
          <Block flex={false} padding={[0, w3]}>
            <Input
              label={Description}
              value={missionReport.report.description}
              editable={false}
              multiline={true}
              style={{height: hp(10)}}
            />
            <Text margin={[t1, 0]} black semibold>
              Details
            </Text>
            {renderDetails(MissionTypeHeader, report.intervention)}
            {renderDetails('Date', formatDate(report.date))}
            {divider()}
            {renderDetails('Heure appel', report.heure_appel)}
            {renderDetails('Heure arivve', report.heure_arivve)}
            {renderDetails('Heure de depart', report.heure_de_depart)}
            {divider()}
            {renderDetails('Constat météo', report.constat_meteo)}
            {renderDetails('Circulation', report.circulation)}
            {renderDetails(
              'Circuit de Vérification',
              report.circuit_de_verification,
            )}
            {renderDetails('Lumière allumée	', report.lumiere_allumee)}
            {renderDetails('Issues(s) ouvertes(s)	', report.issues_ouvertes)}
            {renderDetails('Sirène en fonction	', report.sirene_en_fonction)}
            {renderDetails('Système', report.systeme)}
            {renderDetails(
              'Remise en service du système',
              report.remise_en_service_du_systeme,
            )}
            {renderDetails('Effraction constatée', report.effraction_constatee)}
            {strictValidString(report.signature) && (
              <>
                <Text margin={[t1, 0]} black semibold>
                  Signature
                </Text>
                <Block center middle color="#F7F8FA" flex={false}>
                  <Image
                    source={{
                      uri: `${config.Api_Url}/${report.signature}`,
                    }}
                    style={{height: 200, width: 300}}
                  />
                </Block>
              </>
            )}
          </Block>
        </ScrollView>
        {missionReport.feedback_status === 0 ? (
          <Block flex={false} padding={[0, w3, t2]}>
            <Button
              onPress={() => modalizeRef.current?.open()}
              color="secondary">
              {GiveFeedback}
            </Button>
          </Block>
        ) : (
          <Block flex={false} padding={[0, w3, t2]}>
            <Button onPress={() => modalizeRef.current?.open()} color="primary">
              {EditFeedback}
            </Button>
          </Block>
        )}

        <Modalize
          ref={modalizeRef}
          adjustToContentHeight={true}
          handlePosition="inside">
          <Feedback
            close={() => {
              modalizeRef.current?.close();
              navigation.goBack();
            }}
            mission={missionReport}
            feedback={
              strictValidObjectWithKeys(missionReport.feedback)
                ? missionReport.feedback
                : {}
            }
          />
        </Modalize>
      </Block>
    );
  }
};

export default MissionReport;
