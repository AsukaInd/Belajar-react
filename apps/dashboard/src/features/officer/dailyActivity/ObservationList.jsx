import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { formatDate } from "~/utils/formatDate";

export function ObservationList({
   observations,
   deleteObservation,
   openEditObservation,
}) {
   const { t } = useTranslation();

   return (
      <ul className="list-none pl-0">
         {observations.length > 0
            ? observations.map((observation) => {
                 return (
                    <li key={observation.id} className="mb-2">
                       <div className="flex justify-content-between align-items-center">
                          <div>
                             <b>{observation.type}</b>
                             <br />
                             <b>{formatDate(observation.datetime)}</b>
                          </div>
                          <div>
                             <Button
                                onClick={() =>
                                   deleteObservation(observation.id)
                                }
                                className="mr-2"
                                label={t("common.delete")}
                             />
                             <Button
                                onClick={() => openEditObservation(observation)}
                                label={t("common.edit")}
                             />
                          </div>
                       </div>
                       <p>{observation.comments}</p>
                    </li>
                 );
              })
            : null}
      </ul>
   );
}
