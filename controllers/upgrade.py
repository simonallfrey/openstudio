# -*- coding: utf-8 -*-

from general_helpers import max_string_length
from general_helpers import get_ajax_loader

from openstudio.os_workshop_product import WorkshopProduct
from openstudio.os_invoice import Invoice

from os_upgrade import set_version


def to_login(var=None):
    redirect(URL('default', 'user', args=['login']))


def index():
    """
        This function executes commands needed for upgrades to new versions
    """
    # first check if a version is set
    if not db.sys_properties(Property='Version'):
        db.sys_properties.insert(Property='Version',
                                 PropertyValue=0)
        db.sys_properties.insert(Property='VersionRelease',
                                 PropertyValue=0)

    # check if a version is set and get it
    if db.sys_properties(Property='Version'):
        version = float(db.sys_properties(Property='Version').PropertyValue)

        if version < 2019.02:
            print version
            upgrade_to_201902()
            session.flash = T("Upgraded db to 2019.02")
        else:
            session.flash = T('Already up to date')

        # always renew permissions for admin group after update
        set_permissions_for_admin_group()

    set_version()

    ##
    # clear cache
    ##
    cache.ram.clear(regex='.*')

    # Back to square one
    to_login()


def upgrade_to_201902():
    """
        Upgrade operations to 2019.02
    """
    ##
    # Update invoice links
    ##
    # Customer subscriptions
    query = (db.invoices_customers_subscriptions.id > 0)
    rows = db(query).select(db.invoices_customers_subscriptions.ALL)
    for row in rows:
        query = (db.invoices_items.invoices_id == row.invoices_id)
        item_rows = db(query).select(db.invoices_items.id)
        item_row = item_rows.first()

        db.invoices_items_customers_subscriptions.insert(
            invoices_items_id = item_row.id,
            customers_subscriptions_id = row.customers_subscriptions_id
        )

    # Customer class cards
    query = (db.invoices_customers_classcards.id > 0)
    rows = db(query).select(db.invoices_customers_classcards.ALL)
    for row in rows:
        query = (db.invoices_items.invoices_id == row.invoices_id)
        item_rows = db(query).select(db.invoices_items.id)
        item_row = item_rows.first()

        db.invoices_items_customers_classcards.insert(
            invoices_items_id = item_row.id,
            customers_classcards_id = row.customers_classcards_id
        )

    # Customer memberships
    query = (db.invoices_customers_memberships.id > 0)
    rows = db(query).select(db.invoices_customers_memberships.ALL)
    for row in rows:
        query = (db.invoices_items.invoices_id == row.invoices_id)
        item_rows = db(query).select(db.invoices_items.id)
        item_row = item_rows.first()

        db.invoices_items_customers_memberships.insert(
            invoices_items_id = item_row.id,
            customers_memberships_id = row.customers_memberships_id
        )

