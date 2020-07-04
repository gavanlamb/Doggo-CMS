FROM agentejo/cockpit:0.9.3

COPY --chown=www-data:www-data ./cms/storage /var/www/html/storage/

COPY --chown=www-data:www-data ./cms/addons /var/www/html/addons/

COPY --chown=www-data:www-data ./cms/config /var/www/html/config/

COPY --chown=www-data:www-data ./cms/modules/Collections/assets/field-collectionlink.tag /var/www/html/modules/Collections/assets/field-collectionlink.tag
COPY --chown=www-data:www-data ./cms/modules/Collections/assets/entries-batchedit.tag /var/www/html/modules/Collections/assets/entries-batchedit.tag

RUN sed -i 's/Listen 80/Listen 8080/g' /etc/apache2/ports.conf
RUN sed -i 's/*:80/*:8080/g' /etc/apache2/sites-enabled/000-default.conf

EXPOSE 8080
